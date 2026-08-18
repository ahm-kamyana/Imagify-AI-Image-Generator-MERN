import Header from "../components/Header";
import Steps from "../components/Steps";
import Description from "../components/Description";
import Testimonials from "../components/Testimonials";
import Bottom from "../components/Bottom";

const Home = () => {
  return (
    <>
      <div>
        <Header />
        <Steps />
        <Description />
        <Testimonials />
        <Bottom />
      </div>
    </>
  );
};

export default Home;
