import { useRef, useState } from "react";
import { CSVLink } from "react-csv";

const CSV = () => {
  // const csvData = [
  //   ["firstname", "lastname", "email"],
  //   ["Ahmed", "Tomi", "ah@smthing.co.com"],
  //   ["Raed", "Labes", "rl@smthing.co.com"],
  //   ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  // ];

  const readFile = (file, save, value) => {
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = () => {
      save(reader.result);
    };

    localStorage.setItem(`file`, JSON.stringify(value));
  };

  const [file, setFile] = useState();
  const [fileStore, setFileStore] = useState();
  const [dataArr, setDataArr] = useState();
  const converter = () => {
    const test = JSON.parse(localStorage.getItem(`file`)).split(`\r\n`);
    let result = [];
    for (let i = 0; i < test.length; i++) {
      if (test[i] !== "") {
        result.push(test[i].split(`;`));
      }
    }

    setDataArr(result);
    console.log(result);
    return result;
  };

  const fileName = useRef(null);
  const [name, setName] = useState("");

  const csvName = () => {
    setName(fileName.current.value);
    converter();
  };

  // https://www.npmjs.com/package/react-csv?activeTab=readme
  // https://www.material-react-table.com/docs/examples/export-csv
  // https://stackoverflow.com/questions/11832930/html-input-file-accept-attribute-file-type-csv

  return (
    <div className="container">
      <div>
        <h3>Arr to CSV</h3>
        <div>
          <input type="text" placeholder="file-name" ref={fileName} />
          <button onClick={() => console.log(csvName())}>name generate</button>
        </div>
        {name ? (
          <CSVLink
            data={dataArr}
            filename={`${name}.csv`}
            className="btn btn-primary"
          >
            Download me
          </CSVLink>
        ) : (
          <p>generate file name</p>
        )}
      </div>

      <div style={{ marginTop: 100 }}>
        <h3>CSV to Arr</h3>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button
          onClick={() => {
            readFile(file, setFileStore, fileStore);
            console.log(JSON.parse(localStorage.getItem(`file`)));
          }}
        >
          convert to arr
        </button>
      </div>
    </div>
  );
};

export default CSV;
