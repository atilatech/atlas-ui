import ScholarshipsTable from "./ScholarshipsTable";

function DashBoard() {

    return (
        <div className="mt-3">
            <h1 className="text-center">
                Atila Scholarship Helper
            </h1>
            <div className="DashBoard container card shadow my-5 p-5">
                <ScholarshipsTable />
                <p className="text-center text-muted">
                    Built by <a href="https://atila.ca" target="_blank" rel="noopener noreferrer">Atila</a>
                </p>
            </div>
        </div>
    );
}

export default DashBoard;