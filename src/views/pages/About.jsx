import useStore from "@/store/index";
const About = () => {
  const { count, increment, decrement } = useStore();
  return (
    <div>
      <button onClick={increment}>+</button>
      <span>{count}</span>
      <button onClick={decrement}>-</button>
    </div>
  );
};
export default About;
