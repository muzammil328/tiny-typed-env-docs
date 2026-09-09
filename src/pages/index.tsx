import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const SAMPLE = `import { createEnv, s } from "tiny-typed-env/node";

export const env = createEnv({
  DATABASE_URL: s.url(),
  PORT: s.port({ default: 3000 }),
  TIMEOUT: s.duration({ default: "30s" }),
});

// env.TIMEOUT → 30000`;

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const logo = useBaseUrl('/img/logo.svg');

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={clsx('container', styles.heroInner)}>
        <div>
          <div className={styles.brandMark}>
            <img src={logo} alt="" width={36} height={36} />
          </div>
          <Heading as="h1" className={styles.brandName}>
            {siteConfig.title}
          </Heading>
          <p className={styles.headline}>Typed env. Fail at boot.</p>
          <p className={styles.support}>
            Load and validate environment variables with built-in schemas—or
            Zod, Valibot, and ArkType—across Node, Bun, Deno, and Workers.
          </p>
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--lg', styles.primaryCta)}
              to="/docs/getting-started">
              Getting Started
            </Link>
            <Link
              className={clsx('button button--lg', styles.ghostCta)}
              to="/docs/schema">
              Schema helpers
            </Link>
          </div>
        </div>

        <pre className={styles.codeStage} aria-label="Example createEnv usage">
          <div className={styles.codeChrome}>
            <span />
            <span />
            <span />
            <label>src/env.ts</label>
          </div>
          <code className={styles.codeBody}>
            {SAMPLE}
            <span className={styles.cursor} aria-hidden="true" />
          </code>
        </pre>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Typed environment loader"
      description="Tiny typed environment loader for Node, Bun, Deno, and Workers. Built-in schemas or Zod/Valibot/ArkType.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
