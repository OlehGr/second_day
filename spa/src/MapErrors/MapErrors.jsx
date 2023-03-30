const MapErrors = ({errors, extraClass='', style={}}) => {
    return (
        <>
            {
                errors?.map((error, index) => {
                    return <div key={index}>
                        {
                            error[1].map((message, index) => <div key={index} style={style} className={`alert alert-danger container-sm ${extraClass}`}><strong>{error[0]}</strong> - {message}</div>)
                        }
                    </div>
                    
                })
            }
        </>
    );
}

export default MapErrors;