function LoadingPage() {
    return (
        <div className = 'loading'>
        <p className = 'note'>fetching your data...</p>
        <p className = 'note note-small'>plz do not reload the web page</p>
        <div className="spinner-container">
        <i className = 'fa-solid fa-spinner spinner'/>
        </div>
        </div>
    )
}

export default LoadingPage