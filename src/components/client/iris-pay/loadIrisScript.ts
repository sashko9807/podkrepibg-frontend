const loadIrisSdk = (callback?: () => void) => {
  const existingScript = document.getElementById('iris-sdk')
  if (!existingScript) {
    const script = document.createElement('script')
    script.src = 'https://websdk.irispay.bg/assets/irispay-ui/elements.js'
    script.id = 'iris-sdk'
    document.body.appendChild(script)
    const link = document.createElement('link')
    // link.href = (
    //   <link
    //     rel="stylesheet"
    //     href="https://websdk.irispay.bg/assets/irispay-ui/styles.css"
    //     type="text/css"
    //   />
    // )
    link.href = 'https://websdk.irispay.bg/assets/irispay-ui/styles.css'
    link.rel = 'stylesheet'
    link.type = 'text/css'
    document.body.appendChild(link)
    script.onload = () => {
      if (callback) callback()
    }
  }
  if (existingScript && callback) callback()
}
export default loadIrisSdk
