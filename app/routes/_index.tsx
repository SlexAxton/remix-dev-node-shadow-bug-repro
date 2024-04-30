import type { MetaFunction } from "@remix-run/node";
import * as style from './index.css';

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1 className={style.header}>Green header</h1>
    </div>
  );
}
