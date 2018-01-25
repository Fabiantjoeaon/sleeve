const RecordForm = ({ record = {} }) => (
    <div>
        <div>
            <label>Name</label>
            <input type="text" name="name" defaultValue={record.name} />
        </div>
        <div>
            <label>Artist</label>
            <input type="text" name="artist" defaultValue={record.artist} />
        </div>
        <div>
            <label>Description</label>
            <input
                type="text"
                name="description"
                defaultValue={record.description}
            />
        </div>

        <input type="submit" name="submit" value="submit" />
    </div>
);

export default RecordForm;
