import { Button } from "./components/button/button";
import "./index.css";
import { Layout } from "./components/layout/layout";
import { Toggle } from "./components/toggle/toggle";
import { Heading } from "./components/typography/heading";
import { Card } from "./components/card/card";

export function App() {
  return (
    <Layout
      maxWidth="lg"
      padding="none"
      centered={true}
      defaultTheme="light"
      storageKey="local-components-theme"
    >
      <div className="flex flex-col items-center justify-center mx-auto gap-4  text-center relative z-10 h-screen">
        <Heading as="h1" size="2xl" className=" -mt-10">Local Components</Heading>
        <Toggle variant="switch" className="bg-primary dark:bg-primary-foreground"/>

        <p>Development View</p>
        <div className="flex justify-center gap-4">
          <Button className="rounded-full">Click me</Button>
        </div>
        <Card 
          title="Card Title" 
          description="Card Description" 
          image={{ src: "https://picsum.photos/200/300", alt: "Card Image" }} 
          variant="elevated"
          footer={<Button className="rounded-full">Click me</Button>}
        />
      </div>
    </Layout>
  );
}

export default App;
