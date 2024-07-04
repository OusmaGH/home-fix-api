import {
  Entity,
  Column,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from '../../common/entities/abstract.entity';
import { RequestsAction } from 'src/requests-action/entities/requests-action.entity';

@Entity({ name: 'user' })
export class User extends AbstractEntity<User> {
  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  address?: string;

  @Column({ type: 'varchar', nullable: true })
  phoneNumber?: string;

  @Column({ type: 'varchar', default: 'false' })
  emailVer: string;

  @Column({ type: 'timestamp', default: null })
  privacy: Date;

  @Column({ type: 'varchar', default: null })
  hashedRt: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  resetPassToken: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  resetPassTokenExpires: Date;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deleted_at: Date;

  @OneToMany(() => RequestsAction, (request) => request.user)
  requests: RequestsAction[];

  @AfterInsert()
  logInsert() {
    console.log(`Inserted User with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated User with id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed User with id ${this.id}`);
  }
}
