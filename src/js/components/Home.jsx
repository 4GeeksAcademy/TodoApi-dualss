import React from "react";

import Division from "./Division";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";



//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<Division/>
		</div>
	);
};

export default Home;