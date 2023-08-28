const React = require('react');
const DefaultLayout = require('../Default');

const New = () => {
    return (
        <DefaultLayout>
        <form action="/snacks" method="POST">
            <fieldset>
                <legend>Create a New Snack</legend>
                <label>NAME:<input type="text" name="name" placeholder="enter snack name" /></label>
                <label>COST:<input type="text" name="cost" placeholder="enter snack cost" /></label>
                <label> CALORIES:<input type="number" name="calories" /> </label>
            </fieldset>
            <input type="submit" value="CREATE NEW SNACK" />
        </form>
    </DefaultLayout>
    )
}

module.exports = New;