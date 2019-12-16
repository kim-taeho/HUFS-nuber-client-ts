import React from "react";
import { RouteComponentProps } from "react-router-dom";
import ChatPresenter from "./ChatPresenter";
import { Query } from "react-apollo";
import { getChat, getChatVariables, userProfile } from "../../types/api";
import { GET_CHAT } from "./ChatQueries";
import { USER_PROFILE } from "../../sharedQueries";

interface IProps extends RouteComponentProps<any> { }

class ChatQuery extends Query<getChat, getChatVariables> { }
class ProfileQuery extends Query<userProfile> { }
class ChatContainer extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        if (!props.match.params.chatId) {
            props.history.push("/");
        }
    }
    public render() {
        let { match: { params: { chatId } } } = this.props;
        chatId = Number(chatId);
        return (
            <ProfileQuery query={USER_PROFILE}>
                {({ data: userData }) => (
                    <ChatQuery query={GET_CHAT} variables={chatId}>
                        {({ data, loading }) => (
                            <ChatPresenter
                                data={data}
                                userData={userData}
                                loading={loading} />
                        )}
                    </ChatQuery>
                )}
            </ProfileQuery>
        );
    }
}

export default ChatContainer;