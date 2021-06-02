// Dependencies
import { useState } from 'react'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

const Report = () => {

    const { user, isLoading, error, getAccessTokenSilently } = useAuth0()
    const [tokenError, setTokenError] = useState('')

    //States
    const [results, setResults] = useState(null)

    const getReport = async () => {
        getAccessTokenSilently().then((token) => {
            axios.get('http://localhost:8080/mgmt/rules-per-app', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then((res) => {
                setResults(res.data) 
            }).catch((err) => {
                console.error(err.message)
            })
        }).catch((err) => {
            setTokenError(err.message)
            // console.log(tokenError)
        })
    }

    if (isLoading) {
        return (
            <div id="report-container">
                <h1>Report: Rules Per App</h1>
                <div id="results-container">
                    <p>Loading...</p>
                </div>
            </div>
        )
    } else if (error) {
        return (
            <div id="report-container">
                <h1>Report: Rules Per App</h1>
                <div id="results-container">
                    <p>{error.message}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div id="report-container">
                <h1>Report: Rules Per App</h1>
                <button onClick={getReport}>Generate Report</button>
                <div id="results-container">
                    {results ? results.map((client) => {
                        return (
                            <div key={client.app}>
                                <h4>{client.app}</h4>
                                <ul>
                                    {client.rules.length ? client.rules.map((rule) => {
                                        return <li key={rule}>{rule}</li>
                                    }) : <li>None</li>}
                                </ul>
                            </div>
                        )
                    }) : (tokenError && !user) ? <div>{tokenError}</div> : <div>No Results</div>}
                </div>
            </div>
        )
    }
    


}

export default Report