import Footer from "./footer"
import Header from "./header"

const Layout = ({children}) =>{
    return(
    <div className="flex flex-col min-h-screen bg-[#d7dbdd]">
        <Header/>
        <main className="flex justify-center items-center min-h-auto grow">
        {children}
        </main>
        <Footer/>
    </div>
    )
} 

export default Layout;