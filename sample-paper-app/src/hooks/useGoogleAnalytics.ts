import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const GA_MEASUREMENT_ID = "G-D5206HKQK2"

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void
    }
}

// gtag's initial 'config' call (index.html) only fires a pageview on the first
// hard load. react-router-dom navigates client-side, so route changes need to
// be reported manually or Analytics only ever sees one pageview per session.
const useGoogleAnalytics = () => {
    const location = useLocation()

    useEffect(() => {
        if (!window.gtag) return

        window.gtag("config", GA_MEASUREMENT_ID, {
            page_path: location.pathname + location.search,
        })
    }, [location])
}

export { useGoogleAnalytics }
