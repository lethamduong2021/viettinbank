const oracle = require('node-db-oracle');

// Connection configuration
const connection = new oracle.Connection({
    hostname: 'your_hostname',
    port: 'your_port',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database',
});

// Function to execute batch insert
async function executeBatchInsert(records) {
    const batchSize = 1000; // Number of records to insert per batch
    let startIndex = 0;

    while (startIndex < records.length) {
        const endIndex = Math.min(startIndex + batchSize, records.length);
        const batchRecords = records.slice(startIndex, endIndex);

        const sql = 'INSERT INTO your_table (id, name, city, sex) VALUES (:id, :name, :city, :sex)';
        const bindParameters = batchRecords.map(record => {
            return {
                id: record.id,
                name: record.name,
                city: record.city,
                sex: record.sex,
            };
        });

        try {
            await connection.execute(sql, bindParameters);
            console.log(`Batch inserted ${batchRecords.length} rows.`);
        } catch (error) {
            console.error('Error inserting batch:', error);
        }

        startIndex += batchSize;
    }

    // Close the connection
    await connection.close();
}

// Call the executeBatchInsert function with your merged dataset
executeBatchInsert(mergedDataset);
