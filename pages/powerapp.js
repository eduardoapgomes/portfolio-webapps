import { MongoClient } from 'mongodb';
import JSPLOT from './Components/JSPLOT';
import JSMULTIPLOT from './Components/JSMULTIPLOT';
import 'bootstrap/dist/css/bootstrap.css'


//JSMULTIPLOT({ Va, Vb, Vc, Tempo })
//<JSPLOT X={Index} Y={Vrms} /> SinglePhasePlot
//<JSMULTIPLOT Va={Va} Vb={Vb} Vc={Vc} Tempo={Index} />
//<JSMULTIPLOT Va={Va} Vb={Vb} Vc={Vc} Tempo={Index} />
// {JSON.stringify(Meters[29].Event)}

/* My App with problem....
                    <>
                        <div className="d-flex flex-wrap bg-dark align-items-center justify-content-center">
                            <div className="card  mb-3 mt-3" style={{ width: '22rem;' }}>
                                <div className="card-header">
                                    rms( )
                                </div>
                                <div className="card-body">
                                    <Plotvoltages key = {ts.Event.ID} Sim={ts.Event.ID} />
                                    <p>Dados descritivos do envento simulado.</p>
                                    <h5 className="card-title">
                                        Simulação {ts.Event.ID}
                                    </h5>
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        Dia, mês, ano, hh:mm:ss:mms
                                    </h6>
                                    <p className="card-text">
                                        Aqui será incluindo uma breve descrição do que aconteceu.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
*/
//<div key={index}>
//<p>Simula {index}</p>
//< Plotvoltages Sim={ts.Event.ID} />
//</div>

function PowerApp({ Meters }) {
    return (
        <>

            {
                Meters.map((ts, index) => (


                    <div key={index} className="d-flex flex-wrap bg-dark align-items-center justify-content-center text-black">
                        <div className="card bg-dark border-primary mb-3 mt-3" style={{ width: '22rem' }}>
                            <div className="card-header border-secondary text-secondary">
                                <h6>rms( )</h6>
                            </div>
                            <div className="card-body justify-content-center border-white bg-white">
                                <Plotvoltages key={ts.Event.ID} Sim={ts.Event.ID} />
                                <h5 className="card-title text-secondary">
                                    Simulação {ts.Event.ID}
                                </h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    {ts.Event.date}
                                </h6>
                                <p className="card-text">
                                    Aqui será incluindo uma breve descrição do que aconteceu.
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            }

        </>
    )
    // Auxiliar functions

    function Plotvoltages({ Sim }) {
        let Va = getVrms(Sim, 0),
            Vb = getVrms(Sim, 1),
            Vc = getVrms(Sim, 2),
            Index = getIndex(Sim, 0);


        return (
            <>
                <JSMULTIPLOT Va={Va} Vb={Vb} Vc={Vc} Tempo={Index} />
            </>
        )

    }
    function getVrms(sim, k) {
        const Data = Meters[sim - 1].measures[k].timeseries.map((ts) => (
            ts.vrms
        ))
        return Data
    }
    function getIndex(sim, k) {
        const Index = Meters[sim - 1].measures[k].timeseries.map((ts) => (
            ts.index
        ))
        return Index
    }

}
export default PowerApp

export async function getServerSideProps() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);
    const coll = client.db('powerapp').collection('Meter');
    const filter = { "Event.ID": { $gte: 1, $lte: 5 } };

    //const db = await client.db('powerapp')   
    const cursor = coll.find(filter);
    const Meter = await cursor.toArray();
    await client.close();


    //console.log(result)
    return {
        props: { Meters: JSON.parse(JSON.stringify(Meter)) }
    }
}
