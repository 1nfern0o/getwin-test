import React, {useEffect, useState} from 'react';
import axios from "axios";

const Ar = () => {
    const [ar, setAr] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [sort, setSort] = useState(false);

    const sortHandler = (type) => {
        axios.get('https://prof.world/api/test_json_files/?token=6a06cc0050374e32be51125978904bd8')
            .then(res => {
                setAr([...res.data.data.files.Folder1, ...res.data.data.files.Folder2, ...res.data.data.files.Folder3].flat().sort(function (a, b) {
                    if (a[type].toLowerCase() > b[type].toLowerCase() ) {
                        return 1;
                    }
                    if (a[type].toLowerCase() < b[type].toLowerCase() ) {
                        return -1;
                    }
                    return 0;
                }));
            });
        document.cookie = `sortType=${type}`;
    };

    const sortHandlerNumber = (type) => {
        axios.get('https://prof.world/api/test_json_files/?token=6a06cc0050374e32be51125978904bd8')
            .then(res => {
                setAr([...res.data.data.files.Folder1, ...res.data.data.files.Folder2, ...res.data.data.files.Folder3].flat().sort(function (a, b) {
                    if (a[type] > b[type] ) {
                        return 1;
                    }
                    if (a[type] < b[type] ) {
                        return -1;
                    }
                    return 0;
                }));
            });
        document.cookie = `sortType=${type}`;
    };

    useEffect(() => {
        sortHandler('name');
        setLoading(true);
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            <div onClick={() => sortHandler('name')}>Name</div>
                        </th>
                        <th>
                            <div onClick={() => sortHandlerNumber('atime')}>Atime</div>
                        </th>
                        <th>
                            <div onClick={() => sortHandlerNumber('dev')}>Dev</div>
                        </th>
                        <th>
                            <div onClick={() => sortHandlerNumber('mtime')}>Mtime</div>
                        </th>
                        <th>
                            <div onClick={() => sortHandlerNumber('size')}>Size</div>
                        </th>
                        <th>
                            <div onClick={() => sortHandler('type')}>Type</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {loading && ar.map((item, index) => (
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

export default Ar;