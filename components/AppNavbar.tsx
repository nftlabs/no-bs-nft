import Image from "next/image";
import {
  Stack,
  Link,
  HStack,
  Center,
  Button,
} from "@chakra-ui/react"

export default function AppNavar({view, setView}: any): JSX.Element {

  enum Routes {
    Home = "home",
    Create = "create",
    Explore = "explore",
    Sell = "sell"
  }

  return (
    <>
      <div 
        className="lg:w-20 lg:items-center lg:p-4 lg:rounded-full lg:shadow-lg lg:flex-col lg:right-8 xl:right-32 lg:bottom-48 w-full flex flex-row justify-between py-2 px-8 fixed bottom-0 border-t-2 border-gray-100 bg-white"
      >
        <div className={`lg:my-4 ${view == Routes.Home ? '' : 'opacity-50'}`}>        
          <Button variant="link" onClick={() => setView(Routes.Home)}>
            <Stack>
              <Center>
                <Image 
                  src="/home.svg"
                  height={20}
                  width={20}                
                />
              </Center>
              <p className="text-center text-gray-800">
                Home
              </p>
            </Stack>
          </Button>          
        </div>

        <div className={`lg:my-4 ${view == Routes.Create ? '' : 'opacity-50'}`}>        
          <Button variant="link" onClick={() => setView(Routes.Create)}>
            <Stack>
              <Center>
                <Image 
                  src="/plus-square.svg"
                  height={20}
                  width={20}
                />
              </Center>
              <p className="text-center text-gray-800">
                Create
              </p>
            </Stack>
          </Button>          
        </div>

        <div className={`lg:my-4 ${view == Routes.Sell ? '' : 'opacity-50'}`}>        
          <Button variant="link" onClick={() => {}}>
            <Stack>
              <Center>
                <Image 
                  src="/dollar-sign.svg"
                  height={20}
                  width={20}
                />
              </Center>
              <p className="text-center text-gray-800">
                Sell
              </p>
            </Stack>
          </Button>          
        </div>

        <div className={`lg:my-4 ${view == Routes.Explore ? '' : 'opacity-50'}`}>        
          <Button variant="link" onClick={() => {}}>
            <Stack>
              <Center>
                <Image 
                  src="/search.svg"
                  height={20}
                  width={20}
                />
              </Center>
              <p className="text-center text-gray-800">
                Explore
              </p>
            </Stack>
          </Button>          
        </div>
        
      </div>
    </>
  )
}

export function OffAppNavbar(): JSX.Element {
  return (
    <>
      <div 
        className="lg:w-20 lg:items-center lg:p-4 lg:rounded-full lg:shadow-lg lg:flex-col lg:right-8 xl:right-32 lg:bottom-48 w-full py-2 px-8 fixed bottom-0 border-t-2 border-gray-200 bg-white"
      >
        <Center>
          <Link href="/">
            <button>
              <div className="flex justify-center items-end">
                <p className="text-gray-600 text-lg mx-2">
                  Enter app
                </p>
                
                <Image 
                  src="/arrow-up-right.svg"
                  width={24}
                  height={24}
                />                
              </div>
            </button>
          </Link>
        </Center>
      </div>
    </>  
  )
}