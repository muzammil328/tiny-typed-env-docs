import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  label: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Typed & minimal',
    label: '01',
    description: (
      <>
        Built-in <code>s</code> helpers—no Zod required—with full TypeScript
        inference, nested groups, <code>duration</code>, and <code>bytes</code>.
      </>
    ),
  },
  {
    title: 'Cross-runtime',
    label: '02',
    description: (
      <>
        Use <code>loadEnv</code> anywhere, or <code>createEnv</code> on Node and
        Bun with automatic <code>.env</code> loading.
      </>
    ),
  },
  {
    title: 'Fail-fast + CLI',
    label: '03',
    description: (
      <>
        Invalid env stops the process at boot (secrets redacted). Use{' '}
        <code>npx tiny-typed-env check</code> in CI.
      </>
    ),
  },
];

function Feature({title, label, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <p className={styles.label}>{label}</p>
      <Heading as="h3" className={styles.title}>
        {title}
      </Heading>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
