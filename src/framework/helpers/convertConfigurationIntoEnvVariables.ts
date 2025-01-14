export default function (configuration: object) {
    return new Promise((resolve, reject) => {
        let keys = Object.keys(configuration);
        keys.forEach((key,index) => {
            let value = configuration[key];
            process.env[key] = value;
            if (index + 1 == keys.length) {
                resolve("Added to env.");
            }
        });
    })
	
}