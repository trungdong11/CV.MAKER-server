import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, JoinColumn } from 'typeorm';
import { EvaluateEntity } from './evaluate.entity';
import { GrammarError } from './grammar-error.entity';
import { Suggestion } from './suggestion.entity';

@Entity('evaluate_section')
export class EvaluateSection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  section: string;

  @Column({ type: 'float' })
  content_score: number;

  @Column({ type: 'float' })
  final_score: number;

  @Column({ type: 'json' })
  grammar_errors: { minor: number; severe: number };

  @Column({ type: 'json', nullable: true })
  grammar_errors_detailed: { location?: string; type?: string; description?: string; suggestion?: string }[];

  @Column({ type: 'json', nullable: true })
  suggestions: { issue?: string; suggestion?: string }[];

  @Column()
  quality: string;

  @Column({ type: 'uuid' })
  evaluate_id: string;

  @ManyToOne(() => EvaluateEntity, (evaluate) => evaluate.sections, { nullable: false })
  @JoinColumn({ name: 'evaluate_id' })
  evaluate: Relation<EvaluateEntity>;

  @OneToMany(() => GrammarError, (error) => error.evaluate_section, { cascade: true })
  grammarErrors: Relation<GrammarError>[];

  @OneToMany(() => Suggestion, (suggestion) => suggestion.evaluate_section, { cascade: true })
  suggestionsEntities: Relation<Suggestion>[];
}