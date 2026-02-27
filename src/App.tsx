import { Button } from "./components/button/button";
import "./index.css";
import { Layout } from "./components/layout/layout";


export function App() {
  return (
    <Layout maxWidth="lg" padding="none" centered={true} defaultTheme="light" storageKey="local-components-theme">
      <div className="flex flex-col items-center justify-center mx-auto gap-4  text-center relative z-10 h-screen">
        <h1 className="text-2xl font-bold -mt-10">Local Components</h1>
        <p>Development View</p>
        <div className="flex justify-center gap-4">
          <Button className="rounded-full">Click me</Button>
        </div>
      </div>
    </Layout>
  );
}

export default App;
