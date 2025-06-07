import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './entities/refresh-tokens.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
  ){}
  async signup(signupDto: SignupDto) {
    const { email, password, username } = signupDto;

    // Check if the email is already in use
    const emailInUse = await this.userRepository.findOne({
      where: { email: email },
    });
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = this.userRepository.create({
      email,
      password: await hashedPassword,
      username,
    });

    return this.userRepository.save(newUser);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find the user by email
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate a JWT token
    const tokens = await this.generateToken(user.id);

    return { 
      ...tokens,
      userId: user.id,
    };

  }

  async refreshTokens(refreshToken: string) {
    const storedRefreshToken = await this.refreshTokenRepository.findOne({
      where: { 
        token: refreshToken,
        expiredDate: MoreThanOrEqual(new Date())
      }
    });
    if (!storedRefreshToken) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    return this.generateToken(storedRefreshToken.userId);
  }

  async generateToken(userId) {
    const accessToken = this.jwtService.sign({userId}, {expiresIn: '1h'});
    const refreshToken = uuid();
  
    await this.storeRefreshToken(userId, refreshToken);

    return {
      accessToken,
      refreshToken   
    }
  }

  async storeRefreshToken(userId: string, refreshToken: string) {
    const expiredDate = new Date();
    expiredDate.setDate(expiredDate.getDate() + 3);

    // Check if a refresh token already exists for the user
    const existingToken = await this.refreshTokenRepository.findOne({
      where: { userId: userId } 
    });
    if (existingToken) {

      // If it exists, update the token and expiration date
      existingToken.token = refreshToken;
      existingToken.expiredDate = expiredDate;
      return this.refreshTokenRepository.save(existingToken);
    } 
    else {
      // If it does not exist, create a new refresh token
      const newRefreshToken = this.refreshTokenRepository.create({
        userId: userId,
        token: refreshToken,
        expiredDate: expiredDate,
      });
      return this.refreshTokenRepository.save(newRefreshToken);
    }
  } 
}
