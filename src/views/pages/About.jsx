import useStore from "@/store/index";
const About = () => {
  const { count, increment, decrement } = useStore();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button onClick={increment}>+</button>
      <span>{count}</span>
      <button onClick={decrement}>-</button>
    </div>
  );
};
export default About;


