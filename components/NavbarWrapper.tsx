import Navbar from 'components/Navbar';

export default function NavbarWrapper({ children }: any): JSX.Element {
  
  return (
    <>
      <Navbar />
      {children}
    </>
    )
  }