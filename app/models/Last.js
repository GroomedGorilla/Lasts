export default class Last
{
	constructor(id, text, date, max, timeSince = 0, isEditing = false,)
	{
		this.id = id;
		this.text = text;
		this.date = date;
		this.max = max;
		this.timeSince = timeSince;
		this.isEditing = isEditing;
		this.editText = text;
		this.editDate = date;
		this.editMax = max;
	}
}