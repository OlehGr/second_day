export const MapErrors = ({errors, extra}) => {


    return <>
        {
            orderErros(errors)?.map(([errKey, errs], index) => {
                return <div key={index}>
                    {
                        errs.map((err, i) => <div key={i} className={"alert alert-danger "+extra}>
                            <strong>{errKey}</strong> - {err}
                        </div>)
                    }
                </div>
            })
        }
    </>
}


export const orderErros = errs => {
    if(!errs) return

    let arr = []
    for (const key in errs) {
        arr.push([key, errs[key]])
    }
    return arr
}