import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from '@user/application/dto/user.dto';
import { DeleteUserUseCase, GetUserByIdUseCase, UpdateUserUseCase } from '@user/application/use-cases';
import { UpdateUserRequestDto } from '../dto/update-user.request.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ type: UserDto })
  async getUser(@Param('id', new ParseUUIDPipe()) id: string): Promise<UserDto> {
    return this.getUserByIdUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({ type: UserDto })
  async updateUser(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateUserRequestDto): Promise<UserDto> {
    return this.updateUserUseCase.execute(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse({ type: UserDto })
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string): Promise<UserDto> {
    return this.deleteUserUseCase.execute(id);
  }
}
