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
    const bindParameters = {
        id: [],
        name: [],
        city: [],
        sex: [],
    };

    // Prepare the SQL statement with bind parameters
    const sql = 'INSERT INTO your_table (id, name, city, sex) VALUES (:id, :name, :city, :sex)';

    // Start a transaction
    await connection.beginTransaction();

    try {
        for (let i = 0; i < records.length; i++) {
            const record = records[i];

            bindParameters.id.push(record.id);
            bindParameters.name.push(record.name);
            bindParameters.city.push(record.city);
            bindParameters.sex.push(record.sex);

            // Execute the batch insert after each batchSize
            if (i > 0 && (i + 1) % batchSize === 0) {
                await connection.execute(sql, bindParameters);
                bindParameters.id = [];
                bindParameters.name = [];
                bindParameters.city = [];
                bindParameters.sex = [];
                console.log(`Batch inserted ${batchSize} rows.`);
            }
        }

        // Insert any remaining records
        if (bindParameters.id.length > 0) {
            await connection.execute(sql, bindParameters);
            console.log(`Batch inserted ${bindParameters.id.length} rows.`);
        }

        // Commit the transaction
        await connection.commit();
        console.log('All batches inserted successfully.');
    } catch (error) {
        // Rollback the transaction in case of an error
        await connection.rollback();
        console.error('Error inserting batches:', error);
    } finally {
        // Close the connection
        await connection.close();
    }
}

// Call the executeBatchInsert function with your merged dataset
executeBatchInsert(mergedDataset);
