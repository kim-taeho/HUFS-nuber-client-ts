import React from "react";
import Header from "../../Components/Header";
import styled from "../../typed-components";
import { getChat, userProfile } from "../../types/api";
import Message from "../../Components/Message";

const Container = styled.div``;

interface IProps {
    data?: getChat;
    loading: boolean;
    userData?: userProfile;
}
const ChatPresenter: React.SFC<IProps> = ({
    loading,
    data: { GetChat: { chat = null } = {} } = {},
    userData: { GetMyProfile: { user = null } = {} } = {}
}) => (
        <Container>
            <Header title={"Chat"} />
            {!loading && chat && user && (
                <React.Fragment>
                    {chat.messages &&
                        chat.messages.map(message => {
                            if (message) {
                                return (
                                    <Message key={message.id} text={message.text} mine={user.id === message.userId} />
                                )
                            }
                        })}
                </React.Fragment>)}
        </Container>
    );

export default ChatPresenter;