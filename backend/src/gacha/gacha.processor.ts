import { Process, Processor } from '@nestjs/bull'
import { GachaService } from './gacha.service'
import { Job } from 'bull'
import { UserPullDto } from './dto/pull.dto'
import { Logger } from '@nestjs/common'
import { GachaGateway } from './gacha.gateway'

@Processor('gacha')
export class GachaProcessor {
  private readonly logger = new Logger(GachaProcessor.name)
  constructor(
    private readonly gachaService: GachaService,
    private readonly gachaGateway: GachaGateway
  ) {}

  @Process('gacha-pull')
  async handlePull(job: Job<UserPullDto>) {
    const { userId } = job.data

    try {
      this.logger.log(
        `Procesando pull job ID: ${job.id} para usuario: ${job.data.userId}`
      )
      this.gachaGateway.sendPullUpdate(userId, {
        jobId: job.id,
        status: 'processing',
        message: 'Iniciando pull',
        progress: 10
      })
      await job.progress(10)

      const result = await this.gachaService.gachaPull(job.data)

      this.gachaGateway.sendPullResult(userId, {
        jobId: job.id,
        status: 'completed',
        result,
        mesage: 'Pull completado exitosamente'
      })
      await job.progress(100)

      return result
    } catch (err) {
      this.gachaGateway.sendPullError(userId, {
        jobId: job.id,
        status: 'failed',
        message: 'Error al procesar el pull',
        error: err.message
      })
      throw err
    }
  }
}
