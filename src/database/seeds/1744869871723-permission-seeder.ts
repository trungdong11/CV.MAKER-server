import { PermissionConfiguration } from '@config/permission.config';
import { PermissionEntity } from '@modules/permission/entities/permission.entity';
import { createPermissions } from '@modules/permission/helpers';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class PermissionSeeder1744869871723 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(PermissionEntity);
    const countRecord = await repository.count();
    console.log('run permission seeder');

    if (countRecord === 0) {
      const permissionsDto = createPermissions(
        PermissionConfiguration[0].permissions,
      );

      await repository.insert(permissionsDto).then(() => {
        console.log(
          'Seeder permissions table: ',
          permissionsDto.length,
          'record',
        );
      });
    }
  }
}
