import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation, JoinColumn } from 'typeorm';
import { EvaluateSection } from './evaluate-section.entity';

@Entity('grammar_error')
export class GrammarError {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  suggestion: string;

  @Column({ type: 'uuid' })
  evaluate_section_id: string;

  @ManyToOne(() => EvaluateSection, (section) => section.grammarErrors, { nullable: false })
  @JoinColumn({ name: 'evaluate_section_id' })
  evaluate_section: Relation<EvaluateSection>;
}