import { EventService } from '@common/events/event.service';
import { JwtUtil } from '@common/utils/jwt.util';
import { Global, Module, Provider } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';

const providers: Provider[] = [JwtUtil, EventService];

@Global()
@Module({
  imports: [JwtModule.register({}), EventEmitterModule.forRoot()],
  providers,
  exports: providers,
})
export class CommonModule {}
