import React from "react";

const SpecDetail = ({ specs, specImage, name }) => {
  if (!specs && !specImage) {
    return null;
  }

  const isFlatObject =
    specs &&
    Object.values(specs).every(
      (v) => typeof v !== "object" || v === null || Array.isArray(v)
    );

  return (
    <div className="my-8 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-6">Thông số kỹ thuật</h2>
      <div className="flex  flex-col md:flex-row gap-8 bg-[#efefef] rounded-lg p-6">
        <div className="md:w-1/2 w-full">
          {name && <div className="text-lg font-semibold mb-4">{name}</div>}
          {specs && (
            <div>
              {isFlatObject ? (
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    {Object.entries(specs).map(([key, value]) => (
                      <tr key={key}>
                        <td className="py-1 pr-2 text-gray-700 whitespace-nowrap align-top min-w-[120px]">
                          {key}
                        </td>
                        <td className="py-1 pl-2 text-gray-900 font-medium">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                Object.entries(specs).map(([group, values]) => (
                  <div key={group} className="mb-4">
                    <div className="font-semibold text-base mb-1 ">{group}</div>
                    <table className="w-full text-sm border-collapse">
                      <tbody>
                        {typeof values === "object" &&
                          Object.entries(values).map(([key, value]) => (
                            <tr key={key}>
                              <td className="py-1 pr-2 text-gray-700 whitespace-nowrap align-top min-w-[120px]">
                                {key}
                              </td>
                              <td className="py-1 pl-2 text-gray-900 font-medium">
                                {value}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="md:w-1/2 w-full flex items-center justify-center">
          {specImage && (
            <img
              src={specImage}
              alt={"Thông số kỹ thuật"}
              className="rounded-lg  max-w-full max-h-full "
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecDetail;
