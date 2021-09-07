import ScholarshipsTable from "./ScholarshipsTable";

function DashBoard() {

    return (
        <div className="DashBoard container card shadow my-5 p-5">
            <h1 className="text-center">
                Atila Scholarship Helper
            </h1>
            <ScholarshipsTable />
        </div>
    );
}

export default DashBoard;