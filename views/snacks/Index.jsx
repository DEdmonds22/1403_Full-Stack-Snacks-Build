const React = require('react');
const DefaultLayout = require('../Default')

const Index = ({snacks}) => {
    render (
        <DefaultLayout>
            <div>
                {
                snacks.map((snack) => (
                    <article>
                        <a href={`/snacks/${snack._id }`}>
                            <h2>
                            {snack.name} cost {snack.cost} and is {snack.calories} Calories!
                            </h2>
                        </a>
                    </article>
                ))
                }
            </div>
        </DefaultLayout>
    )
}

module.exports = Index;