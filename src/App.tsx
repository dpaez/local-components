import { Button } from "./components/button/button";
import "./index.css";


export function App() {
  return (
    <div className="container mx-auto p-8 text-center relative z-10">
      <h1 className="text-2xl font-bold">Local Components</h1>
      <p>Development View</p>
      <div className="flex justify-center gap-4">
        <Button className="rounded-full">Click me</Button>
      </div>
    </div>
  );
}

export default App;
