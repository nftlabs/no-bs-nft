import Image from 'next/image'
import Link from 'next/link';
import {
	Center,
	HStack,
	Stack
} from "@chakra-ui/layout";

import { ContentWrapper } from "components/ContentWrapper";
import { OffAppNavbar } from 'components/AppNavbar';

export default function NFT(): JSX.Element {

	const testDescription = (
		`COLORISMS is both a piece of digital art as
		well as an eye and brain game created to 
		enhance the effect of colorization 
		of our reality.`
	)
	return (
		<>
			<ContentWrapper>
				<div className="flex flex-col mt-8 mb-32">
					<Center>
						<div className="overflow-hidden rounded-xl shadow-xl" style={{width: "320px", height: "240px"}}>
							<Image 
								src="/test-art.jpg"
								height={248}
								width={329}
							/>
						</div>
					</Center>

					<div className="mt-8 lg:mt-0 lg:mx-4">
						<Center>
							<Stack px="4" spacing="4" width="400px">							
								<p className="text-center text-4xl text-gray-800 font-extrabold">
									Colorisms
								</p>

								<p className="text-center text-gray-700 text-md">
									{testDescription}
								</p>

								<Center>
									<div className="flex justify-center mb-4">
										<div className="flex flex-col items-center mx-4">
											<p className="text-lg text-gray-600 font-bold my-2">
												Creator
											</p>

											<p className="text-md text-gray-800 font-light">
												{"@typeflood"}
											</p>
										</div>

										<div className="flex flex-col items-center mx-4">
											<p className="text-lg text-gray-600 font-bold my-2">
												Collection
											</p>

											<p className="text-md text-gray-800 font-light">
												{"$SUMMER21"}
											</p>
										</div>
									</div>
								</Center>

								<Center>
									<div className="flex justify-center items-center">
										<p className="text-2xl text-gray-700 font-bold mx-2">
											800
										</p>
										
										<Image 
											src="/usdc-logo.svg"
											height={24}
											width={24}
										/>
									</div>
								</Center>
								<button className="border-2 border-black bg-white shadow-md rounded-lg h-10">
									Buy NFT
								</button>                    
							</Stack>  
						</Center>
					</div>
				</div>
			</ContentWrapper>
			<OffAppNavbar />      
		</>
	)
}