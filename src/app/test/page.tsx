import Title from "@/components/title";

export const runtime = "edge";

export default function Test() {
  return (
    <div>
      <h1>Test</h1>
      <p>This is a test page.</p>
      <Title text="Hello World" />
    </div>
  );
}