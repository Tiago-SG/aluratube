import react from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
    const estiloDaHome = { //backgroundColor: "red" 
    };

    const [valorDoFiltro, setValorDoFiltro] = react.useState("");

    return (
        <>
            <CSSReset />
            <div style={estiloDaHome}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <TimeLine searchValue={valorDoFiltro} playlists={config.playlists} />
                <Favs favorits={config.favorits} />
            </div>
        </>
    )
}

export default HomePage

const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .bn{
        width: 100%; 
        height: 200px;
    }

    .user-info{
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;

const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${config.banner});
    height: 230px;
`;

const StyledFav = styled.span`
    img{
        margin-top: 10px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    a{
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-items: center;
        padding: 8px;
    }
    span{
        font-weight: 600;
        font-size: 14px;
        text-align: center;
        padding-top: 4px;
        color: ${({ theme }) => theme.textColorBase || "#222222"};
    }
`;

function Header() {
    return (
        <StyledHeader>
            <StyledBanner />
            <section className="user-info">
                <img src={config.linkedin} />
                <a>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </a>
            </section>
        </StyledHeader>
    )
}

function TimeLine({ searchValue, ...props }) {
    const playlistNames = Object.keys(props.playlists);
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}

function Favs(props) {
    const favorits = Object.keys(props.favorits);
    return (
        <StyledFav>
            <h2>
                Favoritos
            </h2>
            {favorits.map((favorits) => {
                const perfil = props.favorits[favorits];
                return (
                    <a key={perfil.url} href={perfil.url}>
                        <img src={perfil.photo} />
                        <span> {perfil.name} </span>
                    </a>
                )
            })}
        </StyledFav>
    )
}