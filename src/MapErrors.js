export const MapErrors = ({errors, extraClass=''}) => {
    return <>  
        {
            errors?.map(([errKey, errors], index) => {
                return <div key={index}>
                    {
                        errors.map((err, index) => {
                            return <div key={index} className={"alert alert-danger " + extraClass}><strong>{errKey}</strong> - {err}</div>
                        })
                    }
                </div>
            })
        }
    </>
}   