function mergeDatasets(dataset1, dataset2, commonIdentifier) {
    // Step 1: Build Hash Map
    const hashMap = {};
    const mergedDataset = [];

    for (let i = 0; i < dataset1.length; i++) {
        const record = dataset1[i];
        const identifier = record[commonIdentifier];
        hashMap[identifier] = record;
    }

    // Step 2: Perform Hash Join
    for (let i = 0; i < dataset2.length; i++) {
        const record = dataset2[i];
        const identifier = record[commonIdentifier];
        const matchingRecord = hashMap[identifier];

        if (matchingRecord) {
            const mergedRecord = mergeRecords(matchingRecord, record);
            mergedDataset.push(mergedRecord);
        }
    }

    // Step 3: Store Merged Records or Perform Further Processing
    return mergedDataset;
}

function mergeRecords(record1, record2) {
    return { ...record1, ...record2 };
}

// Example datasets
const dataset1 = [];

const numberOfRecords = 1000000; // Number of records to generate

for (let i = 1; i <= numberOfRecords; i++) {
    const record = {
        id: i,
        name: `Record ${i}`,
        city: `City ${i}`,
    };

    dataset1.push(record);
}

// console.log(dataset1);

const dataset2 = [];

for (let i = 1; i <= numberOfRecords; i++) {
    const record = {
        id: i,
        sex: Math.random() < 0.5 ? 'Male' : 'Female',
    };

    dataset2.push(record);
}

// Merge datasets
const mergedDataset = mergeDatasets(dataset1, dataset2, 'id');

// Display merged dataset
console.log(mergedDataset);
