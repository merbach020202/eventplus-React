import React from 'react';
import './VisionSection.css'
import Title from '../Titulo/Title'

const VisionSection = () => {
    return (
        <section className='vision'>
            <div className='vision__box'>
                <Title 
                    titleText={"Visão"}
                    color="White"
                    potatoClass='vision__title'
                />
                <p className='vision__text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae repellat maiores, commodi vitae aliquam? Mollitia, commodi debitis? Perferendis exercitationem repudiandae adipisci nesciunt quod incidunt odio, obcaecati quidem atque delectus.</p>
            </div>
        </section>
    );
};

export default VisionSection;