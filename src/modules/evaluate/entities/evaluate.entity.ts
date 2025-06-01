import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { EvaluateSection } from './evaluate-section.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { Uuid } from '@common/types/common.type';

@Entity('evaluate')
export class EvaluateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.evaluates, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserEntity>;

  @Column({ type: 'float' })
  total_content_score: number;

  @Column({ type: 'float' })
  total_final_score: number;

  @Column({ type: 'float' })
  content_score_100: number;

  @Column({ type: 'float' })
  final_score_100: number;

  @Column({ type: 'int' })
  total_grammar_errors: number;

  @OneToMany(() => EvaluateSection, (section) => section.evaluate, { cascade: true })
  sections: Relation<EvaluateSection>[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}