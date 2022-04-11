import React, {useEffect, useState} from 'react';
import axios from "axios";

const Folders = () => {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(false);

    const sortHandler = (type) => {
        axios.get('https://prof.world/api/test_json_files/?token=6a06cc0050374e32be51125978904bd8')
            .then(res => {
                setFolders([...res.data.data.files.Folder1, ...res.data.data.files.Folder2, ...res.data.data.files.Folder3].flat().sort(function (a, b) {
                    if(type === 'name') {
                        if (a[type].toLowerCase() > b[type].toLowerCase() ) {
                            return 1;
                        }
                        if (a[type].toLowerCase() < b[type].toLowerCase() ) {
                            return -1;
                        }
                    } else {
                        if (a[type] > b[type] ) {
                            return 1;
                        }
                        if (a[type] < b[type] ) {
                            return -1;
                        }
                    }

                    return 0;
                }));
            });
        document.cookie = `sortType=${type}`;
    };

    useEffect(() => {
        sortHandler(document.cookie.split('sortType=')[1] || 'size');
        setLoading(true);
    }, []);

    return (
        <div className="folders">
            <table className="table">
                <thead className="table__head">
                    <tr>
                        <th>
                            <div onClick={() => sortHandler('name')}>Name</div>
                        </th>
                        <th>
                            <div onClick={() => sortHandler('atime')}>Atime</div>
                        </th>
                        <th>
                            <div onClick={() => sortHandler('dev')}>Dev</div>
                        </th>
                        <th>
                            <div onClick={() => sortHandler('mtime')}>Mtime</div>
                        </th>
                        <th>
                            <div onClick={() => sortHandler('size')}>Size</div>
                        </th>
                        <th>
                            <div onClick={() => sortHandler('type')}>Type</div>
                        </th>
                    </tr>
                </thead>
                <tbody className="table__body">
                {loading && folders.map((item, index) => (
                        <tr key={index + 1}>
                            <td>{item.name}</td>
                            <td>{item.atime}</td>
                            <td>{item.dev}</td>
                            <td>{item.mtime}</td>
                            <td>{item.size}</td>
                            <td>{item.type}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
};

export default Folders;