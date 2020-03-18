import React, { FunctionComponent, useEffect, useState } from 'react';

import styles from './index.cssmodule.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  /* define props interface here */
}

export const App: FunctionComponent<Props> = (props) => {
  // you can access the elements with itemsRef.current[n]
  const [itemsRef, setItemsRef] = useState<Array<HTMLDivElement | null>>([]);
  const [wasRendered, setWasRendered] = useState<boolean>(false);
  useEffect(() => {
    setItemsRef(itemsRef.slice(0, 10));
    window.addEventListener('resize', () => {
      setWasRendered(false);
      setWasRendered(true);
    });
  }, []);

  useEffect(() => {
    setWasRendered(true);
  });

  const renderNodes = () => {
    const nodes = [];
    for (let i = 0; i < 10; i++) {
      nodes.push(
        <div
          key={i}
          className={styles.nodeContainer}
          ref={(el) => (itemsRef[i] = el)}
        >
          <div className={styles.node}>{i}</div>
        </div>,
      );
    }
    return nodes;
  };

  const renderLines = () => (
    <svg className={styles.connector}>
      {itemsRef.map((rect, i) =>
        i < itemsRef.length - 1 ? (
          <line
            x1={itemsRef[i]?.getBoundingClientRect().x}
            y1={itemsRef[i]?.getBoundingClientRect().y}
            x2={itemsRef[i + 1]?.getBoundingClientRect().x}
            y2={itemsRef[i + 1]?.getBoundingClientRect().y}
            className={styles.line}
          />
        ) : null,
      )}
    </svg>
  );

  return (
    <div className={styles.app}>
      {renderNodes()}
      {wasRendered ? renderLines() : null}
    </div>
  );
};
