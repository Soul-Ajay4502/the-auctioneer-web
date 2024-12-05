// import ModalWrapper from "./ModalWrapper";
import PostWithWarning from "./PostWithWarning";
import extractErrorFromRes from "../helpers/extractErrorFromRes";
import ModalWrapper from "./ModalWrapper";

function DeleteWithWarning({
    title,
    endpoint,
    configBody,
    onAfterDelete,
    disabled,
    showAlert,
    type = "",
    DeleteIcon,
}) {
    return (
        <ModalWrapper
            modalTitle={title}
            modalAttrs={{ size: "md" }}
            disabled={disabled}
            renderModalBody={(closeModal) => (
                <PostWithWarning
                    onSuccess={() => {
                        closeModal();
                        onAfterDelete();
                    }}
                    onError={(err) =>
                        showAlert("error", extractErrorFromRes(err))
                    }
                    onCancel={closeModal}
                    endpoint={endpoint}
                    configBody={configBody}
                    dangerVarient={DeleteIcon ? "green" : "error"}
                    successVarient={DeleteIcon ? "error" : "success"}
                />
            )}
        >
            DELETE
        </ModalWrapper>
    );
}

export default DeleteWithWarning;
