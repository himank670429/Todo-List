import { Link } from "react-router-dom"

function AboutContent() {
    return (
    <>  
        <p className = 'about-content heading-large'>Organize Your Productivity!</p>
        <p 
        style = {{marginTop : "3rem"}}
        className = 'about-content heading-medium'>dont memorize your tasks, let us do that</p>
        <p className = 'about-content heading-medium'>for you while you do something else.</p>
        <div 
        style = {{marginTop : "3rem"}}
        className="about-content social">
            <span style = {{marginRight : "1rem"}}>Follow us on</span>
            <Link to = "https://www.instagram.com/dev.himank/"><i class="fa-brands fa-instagram"/></Link>
            <Link to = "https://github.com/himank670429"><i class="fa-brands fa-github"/></Link>
            <Link to = "https://www.linkedin.com/in/himank-singh-65b411249/"><i class="fa-brands fa-linkedin"/></Link>
        </div>
    </>
    )
}

export default AboutContent